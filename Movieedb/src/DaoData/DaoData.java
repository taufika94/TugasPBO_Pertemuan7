/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DaoData;

/**
 *
 * @author ASUS
 */

import java.sql.*;
import java.util.*;
import Connection.Koneksi;
import model.*;
import DaoImplements.DataDaoImplements;
import java.io.FileWriter;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DaoData implements DataDaoImplements {
    Connection con;
    
    final String select = "select * from movie;";
    final String insert = "INSERT INTO movie (judul,alur,penokohan,akting,nilai) VALUES (?,?,?,?,?);";
    final String update = "update movie set alur=?, penokohan=?, akting=? where judul=?;";
    final String delete = "delete from movie where judul=?;";
    
    public DaoData() {
        con = Koneksi.connection();
    }
    
    @Override
    public void insert(DataMovie Movie) {
        PreparedStatement statement = null;
        try {
            statement = con.prepareStatement(insert, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, Movie.getJudul());
            statement.setDouble(2, Movie.getAlur());
            statement.setDouble(3, Movie.getPenokohan());
            statement.setDouble(4, Movie.getAkting());
            statement.setDouble(5, Movie.getRating());
            statement.executeUpdate();
        } catch ( SQLException ex) {
            ex.printStackTrace();
        } finally {
            try {
                statement.close();
            } catch (SQLException ex ) {
                ex.printStackTrace();
            }
        }
    }
    
    @Override
    public void update(DataMovie Movie) {
        PreparedStatement statement = null;
        try {
            statement = con.prepareStatement(update);
            statement.setDouble(1, Movie.getAlur());
            statement.setDouble(2, Movie.getPenokohan());
            statement.setDouble(3, Movie.getAkting());
            statement.setString(4, Movie.getJudul());
            statement.executeUpdate();
        } catch (SQLException ex ) {
            ex.printStackTrace();
        } finally {
            try {
                statement.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
    
    @Override
    public void delete(String judul) {
        PreparedStatement statement = null;
        try {
            statement = con.prepareStatement(delete);
            statement.setString(1, judul);
            statement.executeUpdate();
         } catch (SQLException ex) {
            try (FileWriter writer = new FileWriter("error.log", true)) {
                writer.write("Error updating movie: " + ex.getMessage() + "\n");
                writer.write(Arrays.toString(ex.getStackTrace()) + "\n");
                writer.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } finally {
            try {
                statement.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
    
    @Override
    public List<DataMovie> getAll() {
        List<DataMovie> dm = null;
        try {
            dm = new ArrayList<>();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery(select);
            while (rs.next()) {
                DataMovie md = new DataMovie(rs.getString("judul"), rs.getDouble("alur"), rs.getDouble("penokohan"), rs.getDouble("akting"));
                dm.add(md);
            }
        } catch(SQLException ex){
            Logger.getLogger(DaoData.class.getName()).log(Level.SEVERE, null, ex);
        }
        return dm;
    }
}
