def fields_are_in(dicts, fields):
    for i in fields:
        if i not in dicts:
            return False
    return True


def is_empy_or_none(dicts):
    for i in dicts:
        if dicts[i] is None or dicts[i] == '':
            return True
    return False
