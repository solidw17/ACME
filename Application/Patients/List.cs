using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Patients
{
    public class List
    {
        public class Query : IRequest<List<Patient>>{}

        public class Handler : IRequestHandler<Query, List<Patient>>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Patient>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Patients.ToListAsync();
            }
        }
    }
}