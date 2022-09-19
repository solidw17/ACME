using Application.Patients;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PatientsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Patient>>> GetPatients()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient(Patient patient)
        {
            return Ok(await Mediator.Send(new Create.Command{Patient = patient}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatient(Guid id, Patient patient)
        {
            patient.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Patient = patient}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}