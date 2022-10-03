from setuptools import find_packages, setup
from setuptools.command.install import install


class _InstallCommand(install):
    def run(self):
        install.run(self)


setup(
    name="github_repo_scanner",
    version="1.0.0",
    url="https://github.com/asafnachshon/github-repo-scanner.git",
    packages=find_packages(exclude=[]),
    entry_points={
        "console_scripts": [
            "start_github_repo_scanner = github_repo_scanner.service:main"
        ]
    },
    include_package_data=True,
    cmdclass={
        "install": _InstallCommand,
    },
    classifiers=[
        "Natural Language :: English",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.9",
    ],
)
