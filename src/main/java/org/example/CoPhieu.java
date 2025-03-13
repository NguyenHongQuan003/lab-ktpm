package org.example;

import java.util.ArrayList;
import java.util.List;

public class CoPhieu implements Subject{
    List<NhaDauTu> tt;
    private String id;
    private String name;

    private double price;


    public CoPhieu( String id, String name, double price) {
        this.tt = new ArrayList<>();
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public void changePrice(double price) {
        this.price = price;
        this.notifyChangePrice();
    }

    @Override
    public void add(NhaDauTu tt) {
        this.tt.add(tt);
    }

    @Override
    public void notifyChangePrice() {
        for (NhaDauTu obj: tt
             ) {
            obj.nhanThongBao("Gia thay doi" + price);
        }
    }
}
