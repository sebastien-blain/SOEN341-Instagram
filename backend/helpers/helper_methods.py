def fields_are_in(dicts, fields):
    for i in fields:
        if i not in dicts:
            return False
    return True
