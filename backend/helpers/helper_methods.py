import re


def fields_are_in(dicts, fields):
    for i in fields:
        if i not in dicts:
            return False
    return True


def is_email(email):
    r = re.compile(
        r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
    if not r.match(email):
        return False
    return True
