/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

/**
 *
 * @author ASUS
 */

import View.NewJFrame;
import java.util.List;
import DaoData.DaoData;
import DaoImplements.DataDaoImplements;
import model.*;


public class Controller {
    NewJFrame frame;
    DataDaoImplements impldatamovie;
    List<DataMovie> dp;
    
    public Controller (NewJFrame frame){
        this.frame = frame;
        impldatamovie = new DaoData();
        dp = impldatamovie.getAll();
    }
    public void isitabel(){
        dp = impldatamovie.getAll();
        TabelDataMovie mp = new TabelDataMovie(dp);
        frame.getTableData().setModel(mp);
    }
    
    public void insert(){
        DataMovie dp = new DataMovie(frame.getJudul().getText(), 
        Double.parseDouble(frame.getAlur().getText()), 
        Double.parseDouble(frame.getPenokohan().getText()), 
        Double.parseDouble(frame.getAkting().getText()));
        impldatamovie.insert(dp);
    }
     public void update(){
        DataMovie dp = new DataMovie(frame.getJudul().getText(), 
        Double.parseDouble(frame.getAlur().getText()), 
        Double.parseDouble(frame.getPenokohan().getText()), 
        Double.parseDouble(frame.getAkting().getText()));
        impldatamovie.update(dp);
    }
     public void delete(){
        String judul = (frame.getJudul().getText());
        impldatamovie.delete(judul);
    }
    
}
