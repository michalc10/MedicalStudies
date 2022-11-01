export interface StudyOrder{
    id?:number,
    dateOfStudy:Date,
    dateOfAssignmentOfStudy:Date,
    idProject:number,
    nameProject:string,
    idPatient:number,
    namePatient:string,
    description?:string
}