package org.example.accounts.registration;

public class RegistrationDTO {
    private String username;
    private String hash_password;
    private String email;
    protected String role;
    Long id;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHash_password() {
        return hash_password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getID() {
        return id;
    }

    public void setID(long id) {
        this.id = id;
    }
}
