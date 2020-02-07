def fields_are_in(dict, fields):
    for i in fields:
        if i not in dict:
            return False
    return True
