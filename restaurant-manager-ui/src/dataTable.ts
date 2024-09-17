import {GridColDef} from "@mui/x-data-grid";

//Provides data for the structure of the data-grids on the DataTableItems components

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
        field: "cat_id",
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
        field: "cat_id",
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
        field: "role_id",
        headerName: "role",
        width: 180,
        renderCell: (params) => {
            return params.value === 1 ? "Admin" : params.value === 2 ? "Waiter" : params.value === 9 ? "Cook" : "guest";
        }
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
        field: "status_id",
        headerName: "status_id",
        width: 180
    },
    {
        field: "roster_id",
        headerName: "horaire",
        width: 180,
        renderCell: (params) => {
            return params.value === 1 ? "lundi à vendredi" : params.value === 2 ? "Weekend" : "Autre";
        }
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
        field: "role_id",
        headerName: "role",
        width: 180,
        renderCell: (params) => {
            return params.value === 1 ? "Admin" : params.value === 2 ? "Waiter" : params.value === 9 ? "Cook" : "";
        }
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
        field: "order_id",
        headerName: "id",
        width: 120
    },
    {
        field: "order_date",
        headerName: "date",
        width: 180
    },
    {
        field: "username",
        headerName: "staff",
        width: 180
    },

    {
        field: "people",
        headerName: "pers",
        width: 180
    },
    {
        field: "total",
        headerName: "total €",
        width: 180
    },
    {
        field: "validated",
        headerName: "validée",
        width: 180
    },
    {
        field: "validatedBy",
        headerName: "par",
        width: 180
    }

]

export const purchaseColumns : GridColDef[]=[
    {
        field: "purchase_id",
        headerName: "id",
        width: 120
    },
    {
        field: "purchase_date",
        headerName: "date d'achat",
        width: 180
    },
    {
        field: "totalPurchase",
        headerName: "Coût €",
        width: 120
    },
    {
        field: "delivery_date",
        headerName: "livraison",
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
        field: "people",
        headerName: "pers",
        width: 120
    },
]

/*
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
*/

export const financesColumns : GridColDef[]=[
    {
        field: "id",
        headerName: "id",
        width: 70
    },
    {
        field: "total",
        headerName: "revenus €",
        width: 100
    },
    {
        field: "order_date",
        headerName: "date entrée",
        width: 100
    },
    {
        field: "order_id",
        headerName: "commande n°",
        width: 100
    },
    {
        field: "comments",
        headerName: "remarques",
        width: 150
    },

    {
        field: "totalPurchase",
        headerName: "dépenses €",
        width: 100
    },
    {
        field: "purchase_date",
        headerName: "date dépense",
        width: 100
    },
    {
        field: "purchase_id",
        headerName: "achat n°",
        width: 100
    },
    {
        field: "remarks",
        headerName: "remarques",
        width: 150
    },
    {
        field: "total_on_hand",
        headerName:"total € dispo",
        width: 150
    }
]