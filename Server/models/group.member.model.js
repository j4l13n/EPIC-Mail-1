import connection from '../database/connection';

class groupMember {
  static async save(groupmember) {
    const { rows } = await connection.query('INSERT INTO groupMembers(groupid,memberid) VALUES($1,$2) RETURNING *', [groupmember.groupid, groupmember.memberid]);
    return rows;
  }

  static async delete (groupmember) {
    const { rows } = await connection.query('DELETE FROM groupMembers WHERE groupid=$1 AND memberid=$2 RETURNING *', [groupmember.groupid, groupmember.memberid]);
    return rows;
  }
}
export default groupMember;
