using GlobalApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlobalApi.Infrastructure.Data.Configurations
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable("Customers");

            builder.HasKey(customer => customer.Id);

            builder.Property(customer => customer.Id)
                .HasColumnName("Id");

            builder.Property(customer => customer.Identification)
                .HasColumnName("Identification")
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(customer => customer.FirstName)
                .HasColumnName("FirstName")
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(customer => customer.LastName)
                .HasColumnName("LastName")
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(customer => customer.Email)
                .HasColumnName("Email")
                .HasMaxLength(150);

            builder.Property(customer => customer.Phone)
                .HasColumnName("Phone")
                .HasMaxLength(20);

            builder.HasIndex(customer => customer.Identification)
                .IsUnique();
        }
    }
}
