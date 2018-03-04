/******************** Enums ********************/

// https://en.wikipedia.org/wiki/List_of_building_types

export enum StructureTypeEnum {
    Agricultural,
    Commercial,
    Residential,
    Medical,
    Educational,
    Government,
    Industrial,
    Military,
    ParkingAndStorage,
    Religious,
    Transport
}

export enum StructureAgriculturalTypeEnum {
    Abbatoir, // or Slaughterhouse
    Barn,
    ChickenCoop, // or Chickenhouse
    CowShed,
    Farmhouse,
    Granary,
    Greenhouse,
    Hayloft,
    RootCellar,
    Shed,
    Silo,
    Stable,
    StormCellar,
    Sty, // or Pigpen
    WellHouse,
    Crib,
    Windmill
}

export enum StructureCommercialTypeEnum {
    Arcade,
    CarWash,
    ConventionCenter,
    Drugstore,
    FillingStation,
    Forum,
    Garage, // Automobile repair shop
    Hotel,
    InternetCafe,
    Market,
    MarketHouse,
    Pharmacy,
    Skyscraper,
    Shop,
    ShoppingMall,
    Supermarket,
    Warehouse,
    Restourant,
    Office,
    Hairdressers,
    Cinema
}

export enum StructureResidentialTypeEnum {
    ApartmentBlock,
    BlockOfFlats,
    Bungalow,
    Condominium,
    Duplex,
    House,
    Townhouse,
    Unit,
    Villa,
    Ophranage
}

export enum StructureMedicalTypeEnum {
    PsychiatricHospital,
    Hospital,
    NursingHome,
    Quarantine,
    Asylum,
    DoctorsOffice,
    Dentist,
    Orthodontist
}

export enum StructureEducationalTypeEnum {
    Archive,
    College,
    SecondarySchool,
    Library,
    Museum,
    ArtGallery,
    Theather,
    Amphitheater,
    ConcertHall,
    ElementarySchool,
    University
}

export enum StructureGovernmentTypeEnum {
    CityHall,
    Consulate,
    Courthouse,
    Embassy,
    FireStation,
    MeetingHouse,
    MootHall,
    ParliamentHouse,
    PoliceStation,
    PostOffice,
    Prison, // or Correctional facility
    Assembly
}

export enum StructureIndustrialTypeEnum {
    Brewery,
    Factory,
    Foundry,
    PowerPlant,
    Winery,
    Mull,
    WaterTower,
    Refinery
}

export enum StructureMilitaryTypeEnum {
    Arsenal,
    Barracs,
    Bunker,
    Blockhouse,
    Citadel,
    MissileLaunchFacility
}

export enum StructureParkingAndStorageTypeEnum {
    Boathouse,
    Hangar,
    StorageSilo,
    ParkingLot, // Car park
    ParkingGarage // Multistorey car park
}

export enum StructureReligiousTypeEnum {
    Church,
    Basilica,
    Cathedral,
    Chapel,
    Oratory,
    Martyrium,
    Mosque,
    Mihrab,
    Surau,
    Imambargah,
    Monastry,
    Mithraeum,
    Shrine,
    Synagouge,
    Temple,
    Pagoda,
    Gurdwara,
    HinduTemple
}

export enum StructureTransportTypeEnum {
    Airport,
    BusStation,
    MetroStation,
    TaxiStation,
    RailwayStation,
    Lighthouse
}

export enum StructureStatusEnum {
    Active,
    Inactive,
    UnderConstruction,
    UnderAttack,
    Upgrading,
    Repairing,
    Destroyed
}

/******************** Interfaces ********************/

export interface StructureParametersInterface {

    /**
     * How much health points does that structure have?
     *
     * @var number
     */
    healthPoints: number;

}

export interface StructureDataInterface {

    /**
     * How much health points does that structure have left?
     *
     * @var number
     */
    healthPoints: number;

}
