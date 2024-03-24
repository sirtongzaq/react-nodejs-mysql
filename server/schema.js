const createTables = {
  createUsersTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS users (
          user_id INT(4) NOT NULL AUTO_INCREMENT,
          username VARCHAR(50) NOT NULL,
          password VARCHAR(100) NOT NULL,
          user_email VARCHAR(100) NOT NULL,
          user_firstname VARCHAR(100) NOT NULL,
          user_lastname VARCHAR(100) NOT NULL,
          user_role VARCHAR(100) DEFAULT 'Waiting',
          PRIMARY KEY (user_id)
        )
      `;
  },

  createDepartmentsTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS departments (
          dept_id INT(4) NOT NULL AUTO_INCREMENT,
          dept_name TEXT NOT NULL,
          PRIMARY KEY (dept_id)
        )
      `;
  },

  createActivitysTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS activitys (
          act_id INT(4) NOT NULL AUTO_INCREMENT,
          act_name TEXT NOT NULL,
          datacontroller_firstname TEXT NOT NULL,
          datacontroller_lastname TEXT NOT NULL,
          datacontroller_email TEXT NOT NULL,
          datacontroller_number VARCHAR(10) NOT NULL,
          datacontroller_contact_place TEXT NOT NULL,
          recorder_firstname TEXT NOT NULL,
          recorder_lastname TEXT NOT NULL,
          dept_id INT(4) NOT NULL,
          dept_name TEXT NOT NULL,
          dpo_firstname TEXT NOT NULL,
          dpo_lastname TEXT NOT NULL,
          dpo_contact_place TEXT NOT NULL,
          dpo_email TEXT NOT NULL,
          dpo_number VARCHAR(10) NOT NULL,
          recordreviewer_firstname TEXT NOT NULL,
          recordreviewer_lastname TEXT NOT NULL,
          PRIMARY KEY (act_id)
        )
      `;
  },

  createDataInActivityTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS datainactivity (
          data_id INT(4) NOT NULL AUTO_INCREMENT,
          act_id INT(4) NOT NULL,
          p_data_name TEXT NOT NULL,
          p_data_subject TEXT NOT NULL,
          p_data_source TEXT NOT NULL,
          p_data_type TEXT NOT NULL,
          p_data_type_detail TEXT NOT NULL,
          p_data_object TEXT NOT NULL,
          p_data_legal_base TEXT NOT NULL,
          p_data_time_period TEXT NOT NULL,
          p_data_storage TEXT NOT NULL,
          p_data_name_access TEXT NOT NULL,
          p_data_condition_name_access TEXT NOT NULL,
          p_data_how_to_access TEXT NOT NULL,
          p_data_condition_to_access TEXT NOT NULL,
          p_data_whouse_inorg TEXT NOT NULL,
          p_data_whouse_outorg TEXT NOT NULL,
          p_data_way_destroy TEXT NOT NULL,
          p_data_approve_destroy TEXT NOT NULL,
          PRIMARY KEY (data_id)
        )
      `;
  },

  createMeasuresTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS measures (
          meas_id INT(4) NOT NULL AUTO_INCREMENT,
          act_id INT(4) NOT NULL,
          meas_org TEXT NOT NULL,
          meas_technical TEXT NOT NULL,
          meas_physic TEXT NOT NULL,
          PRIMARY KEY (meas_id)
        )
      `;
  },
};

module.exports = createTables;
