import { dateTimeToLocale } from "./dateTimeTools";

export const exportCsv = (reportsArr) => {
    let headerRow = ['Client', 'Location', 'Room Name', 'Inspection Date', 'Inspected By', 'Last Updated', 'Last Updated By', 'Status', 'General Comments', 'Results'];

    function extractUniqueEquipmentNames(reportsArr) {
        let equipmentNames = [];

        reportsArr.forEach(obj => {
            if (obj.results.length > 0) {
                obj.results.forEach(result => {
                    if (!equipmentNames.includes(result.equipmentId.equipmentName)) {
                        equipmentNames.push(result.equipmentId.equipmentName, 'Comment');
                    }
                });
            }
        });

        return equipmentNames;
    }

    const finalEquipmentNames = extractUniqueEquipmentNames(reportsArr);
    headerRow.push(finalEquipmentNames);

    let finalExport = [];
    finalExport.push(headerRow);

    const issues = (status) => {
        let result = '';
        if (status === 'true') {
            result = 'Issues Reported';
        } else {
            result = 'Passed'
        };

        return result;
    }

    for (let report of reportsArr) {
        let inspectionRow = [];
        inspectionRow[0] = report.roomId.location.client.businessName;
        inspectionRow[1] = report.roomId.location.locationName;
        inspectionRow[2] = report.roomId.roomName;
        inspectionRow[3] = dateTimeToLocale(report.inspectionDate);
        inspectionRow[4] = report.assignedStaff.username;
        inspectionRow[5] = dateTimeToLocale(report.lastUpdated);
        inspectionRow[6] = report.lastUpdatedBy;
        inspectionRow[7] = issues(report.failStatus);
        inspectionRow[8] = report.generalComments;

        

        finalExport.push(inspectionRow);
    }

    let csvContent = ''

    finalExport.forEach(row => {
        let csvRow = row.map(field => {
            if (typeof field === 'string' && field.includes(',')) {
                return `"${field}"`; // Enclose field in double quotes if it contains a comma
            } else {
                return field;
            }
        });

        csvContent += csvRow.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);

    return objUrl;
};