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
          PRIMARY KEY (user_id)
        )
      `;
  },

  createDepartmentsTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS departments (
          dept_id INT(4) NOT NULL AUTO_INCREMENT,
          dept_name VARCHAR(30) NOT NULL,
          PRIMARY KEY (dept_id)
        )
      `;
  },

  createActivitysTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS activitys (
          act_id INT(4) NOT NULL AUTO_INCREMENT,
          act_name VARCHAR(50) NOT NULL,
          datacontroller_firstname VARCHAR(50) NOT NULL,
          datacontroller_lastname VARCHAR(50) NOT NULL,
          datacontroller_email VARCHAR(50) NOT NULL,
          datacontroller_number VARCHAR(10) NOT NULL,
          datacontroller_contact_place VARCHAR(50) NOT NULL,
          recorder_firstname VARCHAR(50) NOT NULL,
          recorder_lastname VARCHAR(50) NOT NULL,
          dept_id INT(4) NOT NULL,
          dept_name VARCHAR(50) NOT NULL,
          dpo_firstname VARCHAR(50) NOT NULL,
          dpo_lastname VARCHAR(50) NOT NULL,
          dpo_contact_place VARCHAR(50) NOT NULL,
          dpo_email VARCHAR(50) NOT NULL,
          dpo_number VARCHAR(10) NOT NULL,
          recordreviewer_firstname VARCHAR(50) NOT NULL,
          recordreviewer_lastname VARCHAR(50) NOT NULL,
          PRIMARY KEY (act_id)
        )
      `;
  },

  createDataInActivityTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS datainactivity (
          data_id INT(4) NOT NULL AUTO_INCREMENT,
          act_id INT(4) NOT NULL,
          p_data_name varchar(50) NOT NULL,
          p_data_subject varchar(50) NOT NULL,
          p_data_source varchar(50) NOT NULL,
          p_data_type varchar(50) NOT NULL,
          p_data_type_detail varchar(50) NOT NULL,
          p_data_object varchar(1000) NOT NULL,
          p_data_legal_base varchar(1000) NOT NULL,
          p_data_time_period varchar(1000) NOT NULL,
          p_data_storage varchar(1000) NOT NULL,
          p_data_name_access varchar(1000) NOT NULL,
          p_data_condition_name_access varchar(1000) NOT NULL,
          p_data_how_to_access varchar(1000) NOT NULL,
          p_data_condition_to_access varchar(1000) NOT NULL,
          p_data_whouse_inorg varchar(1000) NOT NULL,
          p_data_whouse_outorg varchar(1000) NOT NULL,
          p_data_way_destroy varchar(1000) NOT NULL,
          p_data_approve_destroy varchar(1000) NOT NULL,
          PRIMARY KEY (data_id)
        )
      `;
  },

  createMeasuresTable: () => {
    return `
        CREATE TABLE IF NOT EXISTS measures (
          meas_id INT(4) NOT NULL AUTO_INCREMENT,
          act_id INT(4) NOT NULL,
          meas_org varchar(50) NOT NULL,
          meas_technical varchar(50) NOT NULL,
          meas_physic varchar(50) NOT NULL,
          PRIMARY KEY (meas_id)
        )
      `;
  },
};

module.exports = createTables;
