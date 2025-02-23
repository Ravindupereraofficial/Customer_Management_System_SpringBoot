package edu.icet.service.impl;

import edu.icet.dto.Customer;
import edu.icet.entity.CustomerEntity;
import edu.icet.repository.CustomerRepository;
import edu.icet.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor

public class CustomerServiceImpl implements CustomerService {

    final CustomerRepository repository;
    final ModelMapper modelMapper;

    @Override
    public void addCustomer(Customer customer) {
        CustomerEntity customerEntity = modelMapper.map(customer, CustomerEntity.class);
        repository.save(customerEntity);
    }

    @Override
    public List<Customer> getAll() {
        List<Customer> customerArraylist = new ArrayList<>();
        List<CustomerEntity> all = repository.findAll();

        all.forEach(customerEntity -> {
            customerArraylist.add(modelMapper.map(customerEntity, Customer.class));
        });
        return customerArraylist;


    }
    @Override
    public void deleteCustomer(Integer id){
        repository.deleteById(id);
    }

    @Override
    public void updateCustomer(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public void updateCustomer(Customer customer) {
        repository.save(modelMapper.map(customer,CustomerEntity.class));
    }
    @Override
    public Customer searchbyid(Integer id){
        return modelMapper.map(repository.findById(id),Customer.class);
    }

    @Override
    public List<Customer> searchbyname(String name) {
        List<Customer> customerArrayList = new ArrayList<>();
        List<CustomerEntity> all = repository.findByName(name);
        all.forEach(customerEntity -> {
            customerArrayList.add(modelMapper.map(customerEntity, Customer.class));
        });
        return  customerArrayList;
    }
    @Override
    public List<Customer> searchbyaddress(String address) {
        List<Customer> customerArrayList = new ArrayList<>();
        List<CustomerEntity> all = repository.findByAddress(address);
        all.forEach(customerEntity -> {
            customerArrayList.add(modelMapper.map(customerEntity, Customer.class));
        });
        return  customerArrayList;
    }

}
