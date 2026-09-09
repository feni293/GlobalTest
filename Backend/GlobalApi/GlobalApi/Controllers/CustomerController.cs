using GlobalApi.Application.Customers.GetCustomerByIdentification;
using GlobalApi.Application.DTOs;
using GlobalApi.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace GlobalApi.API.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class CustomerController : ControllerBase
    {
        private readonly ISender _sender;

        public CustomerController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet("{identification}")]
        public async Task<IActionResult> GetByIdentification(string identification, CancellationToken cancellationToken)
        {
            var query = new GetCustomerByIdentificationQuery(identification);

            var customer = await _sender.Send(query, cancellationToken);

            if (customer is null)
            {
                return NotFound();
            }

            return Ok(customer);
        }
    }
}
