from apscheduler.schedulers.blocking import BlockingScheduler
from xml_handler import fetch_imoveis

sched = BlockingScheduler()

@sched.scheduled_job('interval', hours=4)
def scheduled_job():
    print("Atualizando imóveis...")
    fetch_imoveis()

sched.start()

