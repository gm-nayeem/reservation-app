export const userColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 220,
    },

    {
        field: "country",
        headerName: "Country",
        width: 120,
    },
    {
        field: "city",
        headerName: "City",
        width: 120,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 130,
    },
];

export const hotelColumns = [
    { field: "_id", headerName: "ID", width: 240 },
    {
        field: "name",
        headerName: "Name",
        width: 180,
    },
    {
        field: "type",
        headerName: "Type",
        width: 120,
    },
    {
        field: "title",
        headerName: "Title",
        width: 250,
    },
    {
        field: "city",
        headerName: "City",
        width: 130,
    },
];

export const roomColumns = [
    { field: "_id", headerName: "ID", width: 240 },
    {
        field: "title",
        headerName: "Title",
        width: 180,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 260,
    },
    {
        field: "price",
        headerName: "Price",
        width: 120,
    },
    {
        field: "maxPeople",
        headerName: "Max People",
        width: 120,
    },
];