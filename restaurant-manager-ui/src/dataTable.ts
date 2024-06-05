import {GridColDef} from "@mui/x-data-grid";


export const dishColumns : GridColDef[] = [

    {
        field: "id",
        headerName: "id",
        width: 120,
    },
    {
        field: "name",
        headerName: "Plat",
        width: 220,
    },

    {
        field: "cat",
        headerName: "cat",
        width: 180,
    },
    {
        field: "price",
        headerName: "prix vente",
        width: 180,
    },

    {
        field: "cost",
        headerName: "prix achat",
        width: 180,
    },
    {
        field: "min",
        headerName: "Stock min",
        width: 180,
    }

];

export const drinksColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "idDrink",
        width: 120,
    },
    {
        field: "name",
        headerName: "Boisson",
        width: 220,
    },
    {
        field: "cat",
        headerName: "Cat",
        width: 220,
    },
    {
        field: "price",
        headerName: "prix vente",
        width: 180,
    },
    {
        field: "cost",
        headerName: "prix achat",
        width: 180,
    },
    {
        field: "min",
        headerName: "min",
        width: 180,
    },
]

export const categoryColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 150,
    },
    {
        field: "cat_name",
        headerName: "catégorie",
        width: 200,
    },
    {
        field: "type",
        headerName: "type",
        width: 150,
    }
]

export const employeeColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 120
    },
    {
        field: "username",
        headerName: "identifiant",
        width: 120
    },
    {
        field: "email",
        headerName: "email",
        width: 220
    },
    {
        field: "tel",
        headerName: "tél",
        width: 220
    },
    {
        field: "role",
        headerName: "role",
        width: 180
    },
    {
        field: "roster",
        headerName: "horaire",
        width: 180,
    }
]

export const inactiveColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 120
    },
    {
        field: "username",
        headerName: "identifiant",
        width: 120
    },
    {
        field: "email",
        headerName: "email",
        width: 220
    },
    {
        field: "tel",
        headerName: "tél",
        width: 220
    },
    {
        field: "role",
        headerName: "role",
        width: 180
    },
]

export const roleColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 150
    },
    {
        field: "role_name",
        headerName: "role",
        width: 150
    }
]

export const rosterColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 150
    },
    {
        field: "roster",
        headerName: "horaire",
        width: 300
    }
]

export const ordersColumns : GridColDef[] = [
    {
        field: "id",
        headerName: "id",
        width: 120
    },
    {
        field: "date",
        headerName: "date",
        width: 180
    },
    {
        field: "by",
        headerName: "staff",
        width: 180
    },

    {
        field: "people",
        headerName: "pers",
        width: 180
    },
    {
        field: "checked",
        headerName: "validée",
        width: 180
    },
    {
        field: "checkedBy",
        headerName: "cuisinier",
        width: 180
    },
    {
        field: "total",
        headerName: "total €",
        width: 180
    },
]

export const purchaseColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 120
    },
    {
        field: "date",
        headerName: "date",
        width: 180
    },
    {
        field: "by",
        headerName: "acheteur",
        width: 180
    },
    {
        field: "cost",
        headerName: "Coût €",
        width: 120
    },
    {
        field: "status",
        headerName: "statut",
        width: 180
    },

]

export const bookingsColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 120
    },
    {
        field: "date",
        headerName: "date",
        width: 180
    },
    {
        field: "hour",
        headerName: "heure",
        width: 180
    },
    {
        field: "name",
        headerName: "nom",
        width: 180
    },
    {
        field: "email",
        headerName: "email",
        width: 220
    },
    {
        field: "numberOfPeople",
        headerName: "pers",
        width: 120
    },
]

export const stockFoodsColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 120
    },
    {
        field: "name",
        headerName: "Plat",
        width: 220,
    },

    {
        field: "cat",
        headerName: "cat",
        width: 180,
    },
    {
        field: "stock",
        headerName: "stock",
        width: 120
    },
    {
        field: "min",
        headerName: "min",
        width: 120
    },
]

export const financesColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 100
    },
    {
        field: "month",
        headerName: "mois",
        width: 120
    },
    {
        field: "orders",
        headerName: "nbre de commandes",
        width: 150

    },
    {
        field: "income",
        headerName: "revenu €",
        width: 150
    },
    {
        field: "purchases",
        headerName: "nbre d'achats",
        width: 150
    },
    {
        field: "cost",
        headerName: "coût €",
        width: 150
    },
    {
        field: "stock",
        headerName: "coût stock €",
        width: 150
    },
    {
        field: "gain",
        headerName:"bénéfice €",
        width: 150
    }
]