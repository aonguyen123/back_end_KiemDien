const moment = require('moment');
const fs = require('fs');
const formidable = require('formidable');
const XLSX = require('xlsx');
const parser = require('xml2json-light');
const csv = require('csvtojson');
const Classes = require('./../../model/classes');
const async = require('async');

exports.importDssvClass = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = 'uploads/';
    form.parse(req, async (err, fields, file) => {
        if(err)
        {
            return res.status(400).json({status: 'parse file fail'});
        }
        const fileName = file.dssvClass.name;
        const parts = fileName.split('.');
        const typeFile = (parts[parts.length - 1]);
        if(typeFile === 'xlsx' || typeFile === 'xls')
        {
            const { path } = file.dssvClass;
            const newPath = form.uploadDir + file.dssvClass.name;
            fs.rename(path, newPath, async err => {
                if(err)
                {
                    return res.status(400).json({status: 'rename fail'});
                }
                const workbook = XLSX.readFile(newPath, {cellDates: true});
                const sheet_name_list = workbook.SheetNames;
                const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                
                let isError = false;
                xlData.some(value => {
                    if(!value.mssv || !value.ten || !value.ngaysinh || !value.gioitinh)
                    {
                        isError = true;
                        res.json({
                            status: 'FILE_FORMAT_ERROR',
                            message: 'The file is not in the correct format',
                            isSuccess: false
                        })
                    }
                    return !value.mssv || !value.ten || !value.ngaysinh || !value.gioitinh;
                });
                if(!isError)
                {
                    const sinhvien = {};
                    const rmDssv = await Classes.updateOne({_id: fields._id}, {dssv: []});
                    if(!rmDssv)
                    {
                        return res.status(400).json({status: 'err'});
                    }
                    async.eachSeries(xlData, function updateObject(obj, done) {
                        sinhvien.maSV = obj.mssv;
                        sinhvien.tenSV = obj.ten;
                        sinhvien.ngaysinh = (
                                                typeFile === 'xls' 
                                                ? moment(obj.ngaysinh).format('DD/MM/YYYY') 
                                                : moment(obj.ngaysinh).add(1, 'days').format('DD/MM/YYYY')
                                            );
                        sinhvien.gioitinh = obj.gioitinh === 'Nam' ? 'Nam' : 'Nữ';
                        Classes.updateMany({_id: fields._id}, {$push: {dssv: sinhvien}}, done);
                    }, function allDone(err) {
                        if(!err)
                        {
                            return res.json({
                                status: 'FILE_IMPORT_SUCCESS',
                                message: 'Successfully imported member list file',
                                isSuccess: true
                            });
                        }
                    });
                }
            });
        }
        else if(typeFile === 'xml')
        {
            const { path } = file.dssvClass;
            const newPath = form.uploadDir + file.dssvClass.name;
            fs.rename(path, newPath, async err => {
                if(err)
                {
                    return res.status(400).json({status: 'Read file error'});
                }
                fs.readFile(newPath, 'utf8', async function(err, data) {
                    if (!err) {
                        const json = await parser.xml2json(data);       
                        const dssv = json.Dssv.Sv;
                        let isError = false;
                        dssv.some(value => {
                            if(!value.mssv || !value.ten || !value.ngaysinh || !value.gioitinh)
                            {
                                isError = true;
                                res.json({
                                    status: 'FILE_FORMAT_ERROR',
                                    message: 'The file is not in the correct format',
                                    isSuccess: false
                                })
                            }
                            return !value.mssv || !value.ten || !value.ngaysinh || !value.gioitinh;
                        });
                        if(!isError)
                        {
                            const sinhvien = {};
                            const rmDssv = await Classes.updateOne({_id: fields._id}, {dssv: []});
                            if(!rmDssv)
                            {
                                return res.status(400).json({status: 'err'});
                            }
                            async.eachSeries(dssv, function updateObject(obj, done) {
                                sinhvien.maSV = obj.mssv;
                                sinhvien.tenSV = obj.ten;
                                sinhvien.ngaysinh = moment(obj.ngaysinh, 'DD/MM/YYYY').format('DD/MM/YYYY');
                                sinhvien.gioitinh = obj.gioitinh === 'Nam' ? 'Nam' : 'Nữ';
                                Classes.updateMany({_id: fields._id}, {$push: {dssv: sinhvien}}, done);
                            }, function allDone(err) {
                                if(!err)
                                {
                                    return res.json({
                                        status: 'FILE_IMPORT_SUCCESS',
                                        message: 'Successfully imported member list file',
                                        isSuccess: true
                                    });
                                }
                            });
                        }
                    }
                });
            });
        }
        else if(typeFile === 'csv')
        {
            const { path } = file.dssvClass;
            const newPath = form.uploadDir + file.dssvClass.name;
            fs.rename(path, newPath, async err => {
                if(err)
                {
                    return res.status(400).json({status: 'Read file error'});
                }
                const dssv = await csv().fromFile(newPath);
                let isError = false;
                dssv.some(value => {
                    if(!value.mssv || !value.ten || !value.ngaysinh || !value.gioitinh)
                    {
                        isError = true;
                        res.json({
                            status: 'FILE_FORMAT_ERROR',
                            message: 'The file is not in the correct format',
                            isSuccess: false
                        })
                    }
                    return !value.mssv || !value.ten || !value.ngaysinh || !value.gioitinh;
                });
                if(!isError)
                {
                    const sinhvien = {};
                    const rmDssv = await Classes.updateOne({_id: fields._id}, {dssv: []}); 
                    if(!rmDssv)
                    {
                        return res.status(400).json({status: 'err'});
                    }
                    async.eachSeries(dssv, function updateObject(obj, done) {
                        sinhvien.maSV = obj.mssv;
                        sinhvien.tenSV = obj.ten;
                        sinhvien.ngaysinh = moment(obj.ngaysinh, 'MM/DD/YYYY').format('DD/MM/YYYY');
                        sinhvien.gioitinh = obj.gioitinh === 'Nam' ? 'Nam' : 'Nữ';
                        Classes.updateMany({_id: fields._id}, {$push: {dssv: sinhvien}}, done);
                    }, function allDone(err) {
                        if(!err)
                        {
                            return res.json({
                                status: 'FILE_IMPORT_SUCCESS',
                                message: 'Successfully imported member list file',
                                isSuccess: true
                            });
                        }
                    });
                }
            });
        }
        else
        {
            return res.json({
                status: 'FILE_WRONG_FORMAT',
                message: 'Wrong file format',
                isSuccess: false
            });
        }        
    });
};