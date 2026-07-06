package org.example.admin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class AdminController {
    private AdminService adminService;

    @PostMapping
    public Admin addAdmin(@RequestBody Admin admin){return admin;}
}
