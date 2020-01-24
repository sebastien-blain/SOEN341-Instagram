install:
	pip3 install -r requirements.txt

test-coverage:
	coverage run -m unittest discover -s tests -p "*_test.py" && coverage report

test-unit:
	python3 -m unittest discover -s tests -p "*_test.py"