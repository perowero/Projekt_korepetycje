package org.example.admin;

import jakarta.persistence.*;
import org.example.accounts.registration.admin.AdminRegistration;
import org.example.accounts.registration.teacher.TeacherRegistration;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String username;
    String email;
    String role;
    String password;

    public Admin(){}

    public long getId(){return id;}

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole() {
        this.role = "admin";
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }
}
