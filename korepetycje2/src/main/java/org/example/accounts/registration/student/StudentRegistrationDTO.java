package org.example.accounts.registration.student;
import org.example.accounts.registration.RegistrationDTO;

public class StudentRegistrationDTO extends RegistrationDTO {
    public String getRole(){
        return "student";
    }
}
