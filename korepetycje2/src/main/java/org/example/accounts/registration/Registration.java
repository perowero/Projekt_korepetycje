package org.example.accounts.registration;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@MappedSuperclass
public abstract class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Transient
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private String username;
    private String hash_password;
    private String email;
    protected String role;

    public Registration(){};

    public void setUsername(String username){
        this.username=username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password){
        this.hash_password=encoder.encode(password);
    }

    public void setHash_password(String hash_password){
        this.hash_password=hash_password;
    }

    public boolean checkPassword(String password){
        return encoder.matches(password,this.hash_password);
    }

    public String getRole() {
        return role;
    }
}
