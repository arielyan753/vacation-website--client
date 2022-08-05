class VacationModel  {
    public vacationId: number; 
    public description: string; 
    public location: string;
    public image: FileList;
    public imageName: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public followers: number;
    public userId: number|null;
    public followedVacation: boolean;
}
export default VacationModel;