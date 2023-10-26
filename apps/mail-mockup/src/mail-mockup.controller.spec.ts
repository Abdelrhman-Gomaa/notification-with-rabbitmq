import { Test, TestingModule } from '@nestjs/testing';
import { MailMockupController } from './mail-mockup.controller';
import { MailMockupService } from './mail-mockup.service';

describe('MailMockupController', () => {
  let mailMockupController: MailMockupController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailMockupController],
      providers: [MailMockupService],
    }).compile();

    mailMockupController = app.get<MailMockupController>(MailMockupController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mailMockupController.getHello()).toBe('Hello World!');
    });
  });
});
