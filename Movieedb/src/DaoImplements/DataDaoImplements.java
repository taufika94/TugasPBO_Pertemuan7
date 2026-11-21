/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DaoImplements;

/**
 *
 * @author ASUS
 */

import java.util.List;
import model.*;

public interface DataDaoImplements {
    
    public void insert(DataMovie movie);
    public void update(DataMovie movie);
    public void delete(String judul);
    public List<DataMovie> getAll();
    
}
