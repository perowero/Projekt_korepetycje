package org.example.accounts.registration.teacher;

import org.example.accounts.registration.RegistrationDTO;

public class TeacherRegistrationDTO extends RegistrationDTO {

    public String getRole(){
        return "teacher";
    }
}
