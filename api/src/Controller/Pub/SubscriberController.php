<?php

namespace App\Controller\Pub;

use App\AppConsts;
use App\Controller\RestController;
use App\Entity\Subscriber;
use App\Form\SubscriberType;
use App\Repository\SubscriberRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;

/**
 * @Route("/subscriber")
 */
class SubscriberController extends RestController
{
    /**
     * create
     * @Route("/create", methods={"POST"})
     * @SWG\Parameter(
     *   name="create", in="body", description="  ",
     *   @Model(type=Subscriber::class, groups={"Subscriber:post", "post"})
     * ),
     * @SWG\Response(
     *   response=201, description="Created",
     *   @SWG\Schema(type="object", ref=@Model(type=Subscriber::class, groups={"Subscriber:get", "get", "File:min"}) )
     * )
     * @SWG\Response(response=400, description="Invalid input")
     * @SWG\Tag(name="PUB_Subscriber")
     */
    public function create(Request $request, SubscriberRepository $contactRepository)
    {
        $entity = new Subscriber();
        $form = $this->createForm(SubscriberType::class, $entity);
        $form->submit($request->request->all());
        $form->handleRequest($request);

        $res = $this->validate($entity, ['Subscriber:post']);
        if($res->type == AppConsts::SUCCESS) {

            $em = $this->em();
            $em->persist($entity);
            $em->flush();

            return $this->json_response(
                $entity,
                AppConsts::CODE_CREATED_201,
                ["Subscriber:list", "get"]
            );
        }

        return $this->json_response($res, AppConsts::CODE_INVALID_INPUT_400);
    }
}
