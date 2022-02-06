export const sellpointBaseA = [
  {
    name: "Supermecado Big Barreiros",
    rede: "Wallmart",
    bandeira: "Big",
    cnpj: "12345678910",
    endereco: "Rua XYZ Barreiros",
    origin: "A",
  },
];

export const sellpointBaseB = [
  {
    name: "Supermecado Big Barreiros",
    chain: "Wallmart",
    bandeira: "Big",
    address: "XYZ Street, Barreiros",
    origin: "B",
    type: "Hyper Super",
  },
  {
    name: "Fort Atacadista Campache",
    chain: "Fort",
    address: "Campache Street, Campache",
    type: "Atacado",
  },
];

export const sellpoints = [...sellpointBaseA, ...sellpointBaseB];
