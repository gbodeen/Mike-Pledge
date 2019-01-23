from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    # def on_start(self):
    #     """ on_start is called when a Locust start before 
    #         any task is scheduled
    #     """
    #     self.login()
    # def login(self):
    #     self.client.get("/login",
    #                      {"username":"ellen_key",
    #                       "password":"education"})
    @task(2)
    def index(self):
        self.client.get("/")
    @task(1)
    def pledge(self):
        self.client.get("/pledge/8888888")
    @task(3)
    def project(self):
        self.client.get("/project/3333")
class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000