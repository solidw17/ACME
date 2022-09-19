using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Patient
    {
            public Guid Id { get; set; }
            [Required]
            public string Nome { get; set; }
            [Required]
            public DateTime DataNascimento { get; set; }
            [Required]
            [StringLength(11)]
            public string CPF { get; set; }
            [Required]
            public string Sexo { get; set; }
            public string Endereco { get; set; }
            public bool Status { get; set; }    
    }
}