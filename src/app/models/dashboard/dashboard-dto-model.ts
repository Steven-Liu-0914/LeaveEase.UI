import { LeaveApplicationDto } from "../leave-apply/leave-apply-dto.model";
import { LeaveHistoryDto } from "../leave-history/leave-history-dto.model";

export interface DashboardDto {
  remainingLeave: number;
  upcomingLeave: number;
  totalApplied: number;
  nextUpcomingLeave: LeaveApplicationDto[];
  pendingApproveLeave: PendingLeavesForReviewDto[];
  remainingDetails: RemainingLeaveDetail[];
}


export interface PendingLeavesForReviewDto {
  leaveApplicationId: number;
  staffId: number;
  staffNumber: string;
  staffName: string;
  leaveType: string;
  startDate: string;      
  endDate: string;
  reason: string;
  status: string;      
  createdAt: string;
}

export interface RemainingLeaveDetail {
  type: string;
  remaining: number;
}