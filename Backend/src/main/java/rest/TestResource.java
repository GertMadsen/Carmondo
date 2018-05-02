/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import entity.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author lene_
 */
@Path("test")
public class TestResource {

    private Car c1 = new Car("logo.jpg", "somecompany", "mini", "pic.jpg", "vw", "up", 2016, "LL12345", 5, 3, "manuel", true, "Cph Airport", 50);
    private Car c2 = new Car("logo.jpg", "somecompany", "economy", "pic.jpg", "Ford", "Fiesta", 2016, "AB89764", 5, 4, "automatic", true, "Cph Airport", 100);
    private Car c3 = new Car("logo.jpg", "anothercompany", "economy", "pic.jpg", "Peugeot", "306", 2017, "YC23456", 5, 5, "manuel", true, "Aarhus City", 100);
    private Car c4 = new Car("logo.jpg", "anothercompany", "fullsize", "pic.jpg", "Toyota", "Avensis stc", 2018, "AB23999", 5, 5, "automatic", true, "Aarhus City", 200);
    private Car c5 = new Car("logo.jpg", "randomcompany", "fullsize", "pic.jpg", "Citroen", "Berlingo", 2016, "AC12345", 7, 5, "manuel", true, "Naestved", 200);
    private Reservation r1 = new Reservation("SC", "test@testersen.dk", "01/05/2018", "04/05/2018");

    private static Gson gson = new Gson();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of TestResource
     */
    public TestResource() {
    }

    /**
     * Retrieves representation of an instance of rest.TestResource
     *
     * @return an instance of java.lang.String
     */
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getAllCars() {
//        Cars cars = new Cars();
//        cars.add(c1);
//        cars.add(c2);
//        cars.add(c3);
//        cars.add(c4);
//        cars.add(c5);
//
//        return gson.toJson(cars);
//    }
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getByLocation(@QueryParam("location") String location) {
        Cars cars = new Cars();
        if (location == null) {
            cars.add(c1);
            cars.add(c2);
            cars.add(c3);
            cars.add(c4);
            cars.add(c5);

            return gson.toJson(cars);
        }
        switch (location) {
            case "Cph Airport":
                cars.add(c1);
                cars.add(c2);
                break;
            case "Aarhus City":
                cars.add(c3);
                cars.add(c4);
                break;
            case "Naestved":
                cars.add(c5);
                break;

        }

        return gson.toJson(cars);
    }

}
