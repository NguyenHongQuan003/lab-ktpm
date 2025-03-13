package org.example;

public class NhaDauTu implements Observer{
    private String name;

    public NhaDauTu(String name) {
        this.name = name;
    }

    public NhaDauTu() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void nhanThongBao(String  mess) {
        System.out.println(this.name + "recieve "+ mess);
    }
}
