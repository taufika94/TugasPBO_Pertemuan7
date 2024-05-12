/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author ASUS
 */
public class DataMovie {
    private String judul;
    private double alur;
    private double penokohan;
    private double akting;
    private double nilai;
    
    public DataMovie(String judul, double alur, double penokohan, double akting) {
        this.judul = judul;
        this.alur = alur;
        this.penokohan = penokohan;
        this.akting = akting;
        this.nilai = (alur + penokohan + akting) / 3; 
    }

    public DataMovie() {
        throw new UnsupportedOperationException("Not supported yet."); 
    }
    
    public void setJudul(String judul) {
        this.judul = judul;
    }
    
    public void setAlur(double alur) {
        this.alur = alur;
    }
    
    public void setPenokohan(double penokohan) {
        this.penokohan = penokohan;
    }
    
    public void setAkting(double akting) {
        this.akting = akting;
    }
    
    public String getJudul() {
        return judul;
    }
    
    public double getAlur() {
        return alur;
    }
    
    
    public double getAkting() {
        return akting;
    }
    
    public double getPenokohan() {
        return penokohan;
    }
    
    public double getRating() {
        nilai = (alur + penokohan + akting) / 3;
        return nilai;
    }

    
}
