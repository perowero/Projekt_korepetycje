package org.example.student;

public class StudentDTO {
    private String name=null;
    private String surname=null;
    private String address=null;
    private int schoolclass=0;
    private String username=null;
    private String email=null;
    private String password=null;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Integer getSchoolclass() { return schoolclass; }
    public void setSchoolclass(Integer schoolclass) { this.schoolclass = schoolclass; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    boolean checkAllAtrributes(){
        if(name==null || surname==null || address==null || schoolclass==0 || username==null || email==null || password==null){
            return false;
        }else{
            return true;
        }
    }

}
