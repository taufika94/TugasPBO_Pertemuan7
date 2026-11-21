/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author ASUS
 */

import java.util.List;
import javax.swing.table.AbstractTableModel;

public class TabelDataMovie extends AbstractTableModel{
    

    List<DataMovie> dp;

    public TabelDataMovie(List<DataMovie> dp) {
        this.dp = dp;
    }

    @Override
    public int getRowCount() {
        return dp.size();
    }

    @Override
    public int getColumnCount() {
        return 5;
    }

    @Override
    public String getColumnName(int column) {
        switch (column) {
            case 0:
                return "JUDUL";
            case 1:
                return "ALUR";
            case 2:
                return "PENOKOHAN";
            case 3:
                return "AKTING";
            case 4:
                return "NILAI";
            default:
                return null;
        }
    }

    @Override
    public Object getValueAt(int row, int column) {
        switch (column) {
            case 0:
                return dp.get(row).getJudul();
            case 1:
                return dp.get(row).getAlur();
            case 2:
                return dp.get(row).getPenokohan();
            case 3:
                return dp.get(row).getAkting();
            case 4:
                return dp.get(row).getRating();
            default:
                return null;
        }
    }

}

