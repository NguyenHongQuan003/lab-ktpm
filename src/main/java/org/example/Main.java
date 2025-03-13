package org.example;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {
        // Press Alt+Enter with your caret at the highlighted text to see how
        // IntelliJ IDEA suggests fixing it.
        CoPhieu s = new CoPhieu("Usdt", "Usdt", 1500);
        NhaDauTu tt = new NhaDauTu("CTY A");
        NhaDauTu tt2 = new NhaDauTu("CTY B");
        s.add(tt);
        s.add(tt2);
        s.changePrice(2000);



    }
}