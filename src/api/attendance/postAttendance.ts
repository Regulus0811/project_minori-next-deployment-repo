import {Attendance} from '@/src/interfaces/attendance';
import req from '../apiUtils';

const postAttendance = async (users: Attendance[]) => {
  const response = await req('/attendances', 'post', 'gin', users);

  return response;
};

export default postAttendance;
