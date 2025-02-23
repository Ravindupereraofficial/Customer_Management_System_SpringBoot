package edu.icet.controller;

import edu.icet.dto.Customer;
import edu.icet.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor

public class CustomerController {

   final CustomerService customerService;


    @PostMapping("/add")
    public void addCustomer(@RequestBody Customer customer) {
        customerService.addCustomer(customer);
    }

    @GetMapping("/getAll")
    public List<Customer> getAll(){


        return customerService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCustomer(@PathVariable("id") Integer id){
        customerService.deleteCustomer(id);

    }
    @PutMapping("/update")
    public void updateCustomer(@RequestBody Customer customer){
        customerService.updateCustomer(customer);
    }

    @GetMapping("/search/{id}")
    public Customer searchbyid(@PathVariable Integer id){
        return customerService.searchbyid(id);
    }

    @GetMapping("/searchbyname/{name}")
    public List<Customer> searchbyname(@PathVariable String name){
        return customerService.searchbyname(name);
    }

    @GetMapping("/searchbyaddress/{address}")
    public List<Customer> searchbyaddress(@PathVariable String address){
        return customerService.searchbyaddress(address);
    }

}
