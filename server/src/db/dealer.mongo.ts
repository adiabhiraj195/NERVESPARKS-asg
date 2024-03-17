import { Schema, model } from "mongoose";

const dealerSchema = new Schema({
    dealership_email: {
        type: String, unique: true, require: true
    },
    dealership_id: {
        type: String, unique: true, require: true
    },
    dealership_name: {
        type: String, require: true
    },
    dealership_location: {
        type: String,
    },
    password: {
        type: String, require: true,
    },
    dealership_info: {
        type: String
    },
    cars: [{
        car_id: { type: String }
    }],
    deals: [{
        deal_id: { type: String }
    }],
    sold_vehicles: [{
        vehicle_id: { type: String, }
    }]
});

const Dealership = model("Dealership", dealerSchema);

export default Dealership;