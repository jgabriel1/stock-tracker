from subprocess import call


def start():
    print('INFO:     Starting Server...')
    try:
        call(['uvicorn', 'server.main:app', '--no-use-colors'])
    except KeyboardInterrupt:
        print('INFO:     Keyboard Interrupt.')


def dev():
    print('INFO:     Starting Server... [Debug Mode]')
    call(['uvicorn', 'server.main:app', '--reload', '--no-use-colors'])


def test():
    call(['pytest', '.\\tests'])
