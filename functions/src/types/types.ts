export interface createTeamResponse {
  name: string;
  owner: string;
  createdAt: FirebaseFirestore.Timestamp;
  users: string[];
  total: number;
}
