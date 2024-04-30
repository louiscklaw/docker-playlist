#dags/example_hello_world.py
"""Example dag for development. We create a dag with two tasks hello_world_1
and hello_world_2 we then trigger 1 and then 2"""

from airflow import DAG
from airflow.operators.bash import BashOperator
import datetime

with DAG(
    dag_id='hello_world_dag',
    start_date=datetime.datetime(2023, 10, 5),
    tags=['example', 'python'],
) as dag:
    task_1 = BashOperator(
    task_id='hello_world_task1',
    bash_command="echo 'Hello World!'"
    )

    task_2 = BashOperator(
    task_id='hello_world_task2',
    bash_command="echo 'Hello World! Now I am triggered after the first task!'",
    )

    task_1 >> task_2 # We use >> the syntax to signify downstream tasks
