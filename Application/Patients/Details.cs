using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Details
    {
        public class Query : IRequest<Patient>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Patient>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Patient> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Patients.FindAsync(request.Id);
            }
        }
    }
}