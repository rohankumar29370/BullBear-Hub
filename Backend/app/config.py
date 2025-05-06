def get_cnx_string():

    username = "admin"
    password = "admin_BBH"
    hostname = "bullbeardev.c3yiyia6uki0.us-east-2.rds.amazonaws.com"
    port = "3306"
    database = "BullBear-Dev1"
    return f"mysql+pymysql://{username}:{password}@{hostname}:{port}/{database}"

    pass