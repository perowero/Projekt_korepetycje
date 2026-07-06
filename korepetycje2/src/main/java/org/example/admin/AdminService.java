package org.example.admin;

public class AdminService {
    private AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository){
        this.adminRepository=adminRepository;
    }

    public Admin saveAdmin(Admin admin){
        return adminRepository.save(admin);
    }
}
