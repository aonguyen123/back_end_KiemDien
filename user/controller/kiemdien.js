exports.getDanhsachKiemdien = async (req, res) => {
    res.json({
        idLop: '5da939aba3c2ea1140993964',
        dssv: [
            {
                "_id": {
                    "$oid": "5da93f71ac69ef1758d48f8f"
                },
                "mssv": "3115410004",
                "ten": "nguyen duc ao",
                "ngaysinh": "20/05/1996"
            },
            {
                "_id": {
                    "$oid": "5da93f71ac69ef1758d48f8e"
                },
                "mssv": "3115410016",
                "ten": "truong tuan dieu",
                "ngaysinh": "21/12/1996"
            },
            {
                "_id": {
                    "$oid": "5da93f71ac69ef1758d48f8a"
                },
                "mssv": "3115410072",
                "ten": "phan hoang tuan",
                "ngaysinh": "21/11/1996"
            }
        ],
        dsKiemdien: [
            {
                mssv: '3115410016',
                ngaykiemdien: '10/10/2019'
            },
            {
                mssv: '3115410004',
                ngaykiemdien: '12/10/2019'
            },
            {
                mssv: '3115410016',
                ngaykiemdien: '12/10/2019'
            },
        ]
    });
};